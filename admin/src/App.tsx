import { Outlet } from "react-router-dom";
import { ToastContainer, Zoom } from "react-toastify";
const App = () => {
  return (
    
      <>
        <Outlet></Outlet>
        <ToastContainer
          position="bottom-center"
          autoClose={3000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          draggable
          pauseOnHover
          theme="dark"
          transition={Zoom}
        />
      </>
    
  );
};

export default App;
