// ─────────────────────────────────────────────────────────────────────────────
// Robust Dual-Layer Storage Engine (IndexedDB + localStorage)
// 
// Why Dual Layer?
// 1. localStorage is synchronous (instant load on page render with zero flicker).
//    However, it has a strict 5MB limit.
// 2. IndexedDB has NO 5MB limit (hundreds of MBs available).
//    It prevents data loss if photos or publications exceed localStorage quota.
// ─────────────────────────────────────────────────────────────────────────────

import { PortfolioData } from '../types/portfolio';

export const STORAGE_KEY = 'emran_portfolio_data_v1';
const DB_NAME = 'emran_portfolio_db';
const DB_VERSION = 1;
const STORE_NAME = 'portfolio_store';
const RECORD_KEY = 'current_data';

/**
 * Open or initialize the IndexedDB instance
 */
function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB not supported'));
      return;
    }

    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

/**
 * Save data to IndexedDB
 */
async function saveToIndexedDB(data: PortfolioData): Promise<boolean> {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(data, RECORD_KEY);

      req.onsuccess = () => resolve(true);
      req.onerror = () => {
        console.error('IndexedDB put error:', req.error);
        resolve(false);
      };
    });
  } catch (err) {
    console.warn('IndexedDB not available, skipping:', err);
    return false;
  }
}

/**
 * Read data from IndexedDB
 */
export async function loadFromIndexedDB(): Promise<PortfolioData | null> {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(RECORD_KEY);

      req.onsuccess = () => {
        const result = req.result as PortfolioData | undefined;
        if (result && result.profile && result.publications) {
          resolve(result);
        } else {
          resolve(null);
        }
      };

      req.onerror = () => {
        console.warn('IndexedDB get error:', req.error);
        resolve(null);
      };
    });
  } catch (err) {
    console.warn('IndexedDB load failed:', err);
    return null;
  }
}

/**
 * Read data synchronously from localStorage (fastest path for initial render)
 */
export function loadFromLocalStorage(): PortfolioData | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && parsed.profile && parsed.publications) {
      return parsed as PortfolioData;
    }
  } catch (err) {
    console.warn('Failed to parse localStorage data:', err);
  }
  return null;
}

/**
 * Save portfolio data to BOTH localStorage and IndexedDB.
 * Returns an object describing the persistence status.
 */
export async function savePortfolioStorage(data: PortfolioData): Promise<{
  localOk: boolean;
  idbOk: boolean;
  quotaExceeded: boolean;
}> {
  let localOk = false;
  let quotaExceeded = false;

  // 1. Try saving to localStorage
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    localOk = true;
  } catch (err: unknown) {
    const isQuota =
      err instanceof DOMException &&
      (err.code === 22 ||
        err.code === 1014 ||
        err.name === 'QuotaExceededError' ||
        err.name === 'NS_ERROR_DOM_QUOTA_REACHED');

    quotaExceeded = isQuota;
    console.warn('localStorage save failed (quota or disabled):', err);
  }

  // 2. Always save to IndexedDB (virtually unlimited capacity)
  const idbOk = await saveToIndexedDB(data);

  return { localOk, idbOk, quotaExceeded };
}

/**
 * Clear both storages (for reset to default)
 */
export async function clearPortfolioStorage(): Promise<void> {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }

  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    tx.objectStore(STORE_NAME).delete(RECORD_KEY);
  } catch {
    // ignore
  }
}
