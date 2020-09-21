import Loadable from "react-loadable";
import LoadingPage from "../LoadingPage";

export default Loadable({
  loader: () => import("./index"),
  loading: LoadingPage,
});
