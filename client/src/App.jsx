import AppRoutes from "./routes/AppRoutes";
import RealtimeBridge from "./component/RealtimeBridge";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { restoreSession } from "./features/auth/authSlice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => { dispatch(restoreSession()); }, [dispatch]);
  return <RealtimeBridge><AppRoutes /></RealtimeBridge>;
}

export default App;
