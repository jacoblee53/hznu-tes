import React, { Component } from 'react'
import { Route } from 'react-router-dom'

class Loader extends Component {
  state = {
    instance: null
  }

  componentDidUpdate(prevProps) {
    if (prevProps.load !== this.props.load) {
      this.load(this.props)
    }
  }

  componentDidMount() {
    this.load(this.props)
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      this.props.load !== nextProps.load &&
      this.state.instance === nextState.instance &&
      this.state.instance
    ) {
      this.load(nextProps)
      return false
    } else {
      return true
    }
  }

  load(props) {
    this.setState({
      instance: null
    })
    props.load(instance => {
      this.setState({
        instance: instance.default
      })
    })
  }

  render() {
    return this.state.instance
      ? this.props.render(this.state.instance)
      : null
  }
}

class Dynamic extends Component {
  render() {
    return (
      <Route
        {...this.props}
        render={props => {
          return (
            <Loader
              load={this.props.load}
              render={Component => {
                return <Component {...props} />
              }}
            />
          )
        }}
      />
    )
  }
}

export default Dynamic
