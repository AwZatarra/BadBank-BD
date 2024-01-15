function Card(props){
    function classes() {
        const bg = props.bgcolor ? ' bg-' + props.bgcolor : ' ';
        const txt = props.txtcolor ? ' text-' + props.txtcolor: ' text-white';
        return 'card mb-3 ' + bg + txt;
    }

    function styles() {
        const wdth = props.width ? props.width: "18rem";
        return wdth;
    }
    return (
        <div className={classes()} style={{minWidth: styles(), maxWidth: styles()}}>
            <div className="card-header"><h4>{props.header}</h4></div>
            <div className="card-body">
                {props.title && (<h5 className="card-title">{props.title}</h5>)}
                {props.text && (<p className="card-text">{props.text}</p>)}
                {props.body}
                {props.status && (<div id="createStatus">{props.status}</div>)}
            </div>
        </div>
    )
}

export default Card;