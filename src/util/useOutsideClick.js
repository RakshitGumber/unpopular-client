import { useEffect } from "react";

function useOutsideClick(ref, doFunc, optional) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (optional?.notOnRef) {
        if (
          ref.current &&
          !ref.current.contains(event.target) &&
          !optional?.notOnRef.current.contains(event.target)
        ) {
          doFunc();
        }
      } else if (optional?.notOnRef?.length > 0) {
        if (
          ref.current &&
          !ref.current.contains(event.target) &&
          !optional.notOnRefs.some((notOnRef) =>
            notOnRef?.current.contains(event.target)
          )
        ) {
          doFunc();
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, doFunc, optional]);
}

export default useOutsideClick;
