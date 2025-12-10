import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSession } from "../sessions/SessionContext";

export default function AuthCallback() {
    const [params] = useSearchParams();
    const navigate = useNavigate();
    const { setToken } = useSession();

    useEffect(() => {
        const token = params.get("token");
        const returnTo = params.get("returnTo") ?? "/";

        if (!token) {
            navigate("/");
            return;
        }

        setToken(token);
        navigate(returnTo);
    }, []);

    return <div>Completing login…</div>;
}
