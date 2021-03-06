import React from 'react'
import {connect} from 'react-redux'
import {createPost, showAlert} from '../redux/actions'
import {Alert} from './Alert'

class PostForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      title: ''
    }
  }

  submitHandler = event => {
    event.preventDefault()

    const {title} = this.state

    if (!title.trim()) {
      return this.props.showAlert('Название поста не может быть пустым')
    }
    const newPost = {
      title, id: Date.now().toString()
    }

    this.props.createPost(newPost)
    this.setState({ title: '' })

  }

  changeInputHandler = event => {
    event.persist()
    this.setState(prev => ({...prev, ...{
      [event.target.name]: event.target.value
    }}))
  }

  render() {
    return (
      <form onSubmit={this.submitHandler}>
        <div className="form-group">
          <label htmlFor="title"/>
          <input
            type="text"
            className="form-control"
            id="title"
            placeholder="напишите пост"
            value={this.state.title}
            name="title"
            onChange={this.changeInputHandler}
          />
        </div>
        {this.props.alert && <Alert text={this.props.alert} />}
        <button className="btn btn-success" type="submit">Создать</button>
      </form>
    )
  }
}

const mapDispatchToProps = {
  createPost, showAlert
}

const mapStateToProps = state => ({
  alert: state.appReducerKey.alert
})

export default connect(mapStateToProps, mapDispatchToProps)(PostForm)
// первый аргумент - стейт, второй - массив action-ов, которые необходимо спроецировать на свойства данного компонента
