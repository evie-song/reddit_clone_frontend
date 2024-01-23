import MaterialIcon from "./button-tag-icons/material-icon"
import FullLengthButton from "./button-tag-icons/full-length-button"

const NoPermission = () => {
	return (
		<div className="d-flex align-items-center justify-content-center flex-column w-100 whole-page-container p-4">
			<div className="">
				<MaterialIcon iconName={"key"} fontSize={"32px"} padding={"16px"}/>
			</div>
			<div className="no-permission-font">
			You do not have permission to access this page.
			</div>
			<div className="w-100">
				<a href="/">
			<FullLengthButton text={"View Other Communities"} color={"white"} backgroundColor={"#0045ac"} border={"1px solid white"} />
			</a>
			</div>
			

		</div>
	)
}

export default NoPermission