import Error404 from "../Error404/error";
import {Component} from "react";

export default class ErrorBoundary extends Component {
    state = {
        error: false,
    }

    componentDidCatch(error, errorInfo) {
        console.log(error + ' - ' + errorInfo);
        this.setState({
            error : true,
        })
    }

    render() {
            if(this.state.error) {
                return <Error404/>
            }
            return this.props.children
    }
}
