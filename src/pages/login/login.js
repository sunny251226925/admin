import React from 'react';
import logo from '../../images/logo.png';
import logoTitle from '../../images/logo-2.png';
import api from '../../utils/api';
import global from '../../utils/config';
import { message } from 'antd';
import { encrypt } from '../../utils/aes';
import axios from 'axios';
import './login.css';
import {cookie} from '../../utils/common';


class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            userName: '',
            passWord: '',
            capText: '',
            qrCode: '',
            CPSP_BACK_USER_TOKEN: ''
        }

        this.submit = this.submit.bind(this);
        this.userChange = this.userChange.bind(this);
        this.passChange = this.passChange.bind(this);
        this.codeChange = this.codeChange.bind(this);
    }

    submit = () => {
        const params = {
            userName: this.state.userName,
            passWord: this.state.passWord,
            capText: this.state.capText,
        }
        if(params.userName === ''){
            message.error("请输入用户名");
        } else if (params.passWord === ''){
            message.error("请输入密码");
        } else if (params.capText === ''){
            message.error("请输入验证码");
        } else {
            const {history} = this.props;
            params.passWord = encrypt(params);
            axios.defaults.headers.common['CPSP_BACK_USER_TOKEN'] = this.state.CPSP_BACK_USER_TOKEN;
            const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NDQ2OTE1MTQyMDcsInBheWxvYWQiOiJcIjEwNTUwMzA5ODMwODM5NTQxNzdcIiJ9.VsSpUc6SV4GtXreedc77MoVO8M_oNBLbhiUg_GcOP5k';
            api.login(params).then( (res) => {
                cookie.put('token',token)
                history.push("/app");
            })
        }
    }

    userChange =(event) => {
        this.setState({
            userName: event.target.value
        })
    }

    passChange =(event) => {
        this.setState({
            passWord: event.target.value
        })
    }

    codeChange =(event) => {
        this.setState({
            capText: event.target.value
        })
    }

    componentDidMount(){
        api.getQrcode().then(res => {
            this.setState({
                qrCode: global.imgRoot + res.img,
                CPSP_BACK_USER_TOKEN: res.CPSP_BACK_USER_TOKEN
            })
        })
    }

    render() {
        return (
          <div className="box">
              <div className="logos">
                  <img src={logo} height="45" alt="logo" />
              </div>
              <div className="login">
                  <div className="login-title">
                      <img src={logoTitle} height="45" alt="logo" />
                      <span>|</span>
                      <span>安全生产综合管理云平台</span>
                  </div>
                  <ul className="login-from">
                    <li className="li hover">
                        <label className="label username"></label>
                        <div className="text">
                            <input type="text" className="input" value={this.state.userName} onChange={this.userChange} />
                        </div>
                    </li>
                    <li className="li-error"></li>
                    <li className="li hover">
                        <label className="label password"></label>
                        <div className="text">
                            <input type="password" className="input" value={this.state.passWord} onChange={this.passChange}/>
                        </div>
                    </li>
                    <li className="li-error"></li>
                    <li className="li li-border">
                        <div className="text" >
                            <input type="text"
                                   className="input input2 hover"
                                   placeholder="请输入验证码"
                                   maxLength="4"
                                   value={this.state.capText}
                                   onChange={this.codeChange}
                            />
                            <img src={this.state.qrCode} className="qr-code" alt="验证码" title="点击重新获取" />
                        </div>
                    </li>
                    <li className="li-error"></li>
                    <li className="li-2">
                        <input type="button" value="登录" className="submit" onClick={this.submit} />
                    </li>
                    <p className="li2-error" ></p>
                  </ul>
              </div>

              <p className="text-center help">
                  <span className="left">Copyright © 2018 北京迈道科技有限公司  京ICP备16026384号-1</span>
                  <span className="right">
                      <a href="http://www.imydao.com">关于迈道</a>
                      <a href="./dist/view/help.html?id=policy">免责声明</a>
                      <a href="./dist/view/help.html?id=privacy">隐私政策</a>
                      <a href="./dist/view/help.html?id=security">使用许可及服务协议</a>
                  </span>
              </p>
          </div>
        );
      }
}

export default Login;
