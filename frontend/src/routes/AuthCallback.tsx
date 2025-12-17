import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSession } from "../sessions/SessionContext";

export default function AuthCallback() {
    const [params] = useSearchParams();
    const navigate = useNavigate();
    const { setToken } = useSession();

    useEffect(() => {
        let token = params.get("token");
        let returnTo = params.get("returnTo") ?? "/";

        if (!token && returnTo.includes("token=")) {
            try {
                const url = new URL("http://dummy" + returnTo); 
                token = url.searchParams.get("token");
                returnTo = url.pathname + url.search.replace(/token=[^&]+&?/, ""); 
            } catch {
                token = "";
            }
        }

        if (!token) {
            navigate("/");
            return;
        }

        setToken(token);

        navigate(returnTo, { replace: true });
    }, [params, navigate, setToken]);

    return <div>Completing login…</div>;
}
