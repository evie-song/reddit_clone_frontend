import MaterialIcon from "../button-tag-icons/material-icon";
import styles from '../../styles/right-column-body/premium-widget.module.css';
import FullLengthButton from "../button-tag-icons/full-length-button";
import { withRouter } from "next/router";


export default function PremiumWidget(){
    return (
        <div className={`d-flex flex-column ${styles.container} premium-widget-container`}>
            <div className="d-flex flex-row align-items-center margin-bottom-8 }">
                <div className="">
                    <MaterialIcon iconName={"assistant"} fontSize={"24px"} padding={"0"} customClass={"premium-icon"} />
                </div>
                <div className="d-flex flex-column">
                    <div className={styles.title}>Reddit Premium</div>
                    <div className={styles.description}>The best reddit experience</div>
                </div>
            </div>
            <div>
                <FullLengthButton text={"Try Now"} color={"white"} backgroundColor={"rgb(255, 69, 0)"} border={"1px solid white"} />
            </div>
        </div>
    )
}