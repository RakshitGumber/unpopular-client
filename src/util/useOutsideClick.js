import { useEffect } from "react";

function useOutsideClick(ref, doFunc, { notOnRef }) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        !notOnRef.current.contains(event.target)
      ) {
        doFunc();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, doFunc, notOnRef]);
}

export default useOutsideClick;
