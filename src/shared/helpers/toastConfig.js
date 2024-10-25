import iziToast from 'izitoast';

const toastSuccessConfig = {
    timeout: 5000,
    progressBar: true,
    close: true,
    position: window.innerWidth <= 768 ? 'bottomCenter' : 'topCenter', 
    color: 'green',
    backgroundColor: '#dce9f5',
    messageColor: '#069631',
    titleColor: '#069631',
    borderColor: '#069631',
    title: 'Success',
};

const toastErrorConfig = {
    timeout: 5000,
    progressBar: true,
    close: true,
    position: window.innerWidth <= 768 ? 'bottomCenter' : 'topCenter', 
    color: 'red',
    backgroundColor: '#f5f3ed',
    messageColor: '#c0392b',
    titleColor: '#c0392b',
    borderColor: '#e74c3c',
    title: 'Error', 
};

const toastInfoDuplicateConfig = {
  timeout: 5000,
  progressBar: true,
  close: true,
  position: window.innerWidth <= 768 ? 'bottomCenter' : 'topCenter',
  color: 'blue',
  backgroundColor: '#f0f4f8',
  messageColor: '#1e90ff',
  titleColor: '#1e90ff',
  borderColor: '#4682b4',
  title: 'Duplicate',
};
  
const toastSuccess = (message) => {
    iziToast.show({
      ...toastSuccessConfig,
      message: message,
    });
};
  
const toastError = (message) => {
    iziToast.show({
      ...toastErrorConfig,
      message: message,
    });
};

const toastInfoDuplicate = (message) => {
  iziToast.show({
    ...toastInfoDuplicateConfig,
    message: message,
  });
};

  
export { toastSuccess, toastError, toastInfoDuplicate };