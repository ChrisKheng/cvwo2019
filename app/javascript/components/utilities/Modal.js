import React from 'react'

class Modal extends React.Component {
    render() {
        if (!this.props.show) {
            return null;
        }

        return (
            <div className="myModal">
                <section className="modal-main">
                    <button type="button" onClick={this.props.onHide}>Close</button>
                    {this.props.children}
                </section>
            </div>
        )
    }
}

export default Modal