import { useState } from "react"
import styles from "../../styles/user-page/header-title.module.css"

const HeaderTitle = ({ name, customClass }) => {
	const [isHovered, setIsHovered] = useState(false)
	return (
		<div 
		 	onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			className={`${styles.title} ${isHovered? styles.isHovered : styles.isNotHovered} ${customClass}`}
		>
			<div>{name}</div>
		</div>
	)
}

export default HeaderTitle