import './index.css'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core'
import { Provider } from 'react-redux';
import store from './store.ts';
import { Toaster, toast, ToastBar } from "react-hot-toast";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRemove } from '@fortawesome/free-solid-svg-icons';
createRoot(document.getElementById('root')).render(
  <div className='bg-gray-800 w-full h-screen'>
    <Provider store={store}>
      <MantineProvider>
        <Toaster toastOptions={{ position: "top-right" }}>
          {(t) => (
            <ToastBar toast={t}>
              {({ icon, message }) => (
                <>
                  {icon}
                  {message}
                  {t.type !== "loading" && (
                    <button onClick={() => toast.dismiss(t.id)}>
                      <FontAwesomeIcon
                        icon={faRemove}
                        className="text-red-600"
                      />
                    </button>
                  )}
                </>
              )}
            </ToastBar>
          )}
        </Toaster>
        <App />
      </MantineProvider>
    </Provider>
  </div>
)
