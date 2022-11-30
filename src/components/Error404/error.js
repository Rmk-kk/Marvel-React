import img from './404-page-not-found-karhu-helsinki.jpg'
console.log(img)

const Error404 = () => {
    return (
        <img src={img} alt='404 Error' style={{ width: '450px' ,objectFit : 'cover', margin: '0 auto' }}/>
    )
}

export default Error404;