import { Route, Navigate } from "react-router-dom";

function Main() {
  return <Route path="*" element={<Navigate to="/user/login" replace />} />
}
export default Main;
