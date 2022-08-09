import { useDispatch } from "../../state/hooks";

export default () => {
    
  const dispatch = useDispatch();

  function handleShowSnackBar(snackOpts) {
    dispatch({
      type: "ADD_ENTRIES",
      context: "toast",
      payload: {
        ...snackOpts,
        visible: true,
      },
    });
  }

  function handleHideSnackBar() {
    dispatch({
      type: "ADD_ENTRIES",
      context: "toast",
      payload: {
        visible: false,
      },
    });
  }

  return {
    handleHideSnackBar,
    handleShowSnackBar,
  };
};
