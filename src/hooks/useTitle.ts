import { useEffect } from "react";

function useTitle(title: string) {
	useEffect(() => {
		document.title = title;

		return () => {
			document.title = "Klinvo";
		};
	}, [title]);
}

export default useTitle;
