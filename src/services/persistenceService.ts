
export class PersistenceService {
    get(key : string) : any {
        try {
            const stored = sessionStorage.getItem(key)
            if (!stored) {
                return undefined
            }
            return JSON.parse(stored)
        } catch (error) {
            return undefined
        }
    }

    set(key : string, value : any) {
        try {
            sessionStorage.setItem(key, JSON.stringify(value))
        } catch (error) {
            
        }
    }

    clear() {
        try {
            sessionStorage.clear()
        }
        catch (error) {}
    }

    delete(key : string) {
        try {
            sessionStorage.removeItem(key)
        } catch (error) {}
    }
}