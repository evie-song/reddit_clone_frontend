export default function MaterialIcon({iconName, fontSize, padding, customClass}){
    return (
        <div style={{padding: padding}} className={`d-flex align-items-center ${customClass}`}>
            <i className='material-icons' style={{fontSize: fontSize}}>
                {iconName}
            </i>
        </div>
    )
}
    
    


