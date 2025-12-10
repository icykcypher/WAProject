export async function apiRequest<T>(url: string, method: string, token?: string, body?: any): Promise<T> {
    const res = await fetch(`http://localhost:5000${url}`, {
        method,
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        credentials: "include",
        body: body ? JSON.stringify(body) : undefined
    });

    if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message ?? "Request failed");
    }

    return res.json();
}
