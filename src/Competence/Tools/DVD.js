export default function DVD({ size, image }) {
    const dvdGlobe = {
        width: size + 'px',
        height: size + 'px',
        borderRadius: '50%',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: '1px solid #333',
        backgroundColor: 'white',
        backgroundSize: 'cover',
    };
    const dvdStyle = {
        width: size - (size / 10) + 'px',
        height: size - (size / 10) + 'px',
        borderRadius: '50%',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
    };

    const dvdNombril = {
        width: size / 10 + 'px',
        height: size / 10 + 'px',
        borderRadius: '50%',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        border: `${size / 100}px solid gray`,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    };

    return (
        <div className="dvd" style={dvdGlobe}>
            <div className="dvd" style={dvdStyle}>
                <div className="dvd" style={dvdNombril}>

                </div>
            </div>
        </div>
    );
}