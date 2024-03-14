export default function MaterialIcon({iconName, fontSize = 14 , padding = 0, customClass}){
    return (
        <div style={ {padding: padding ? padding : 0}} className={`d-flex align-items-center ${customClass}`}>
            <i className='material-icons' style={{fontSize: fontSize ? fontSize: 14 }}>
                {iconName}
            </i>
        </div>
    )
}
    
    


