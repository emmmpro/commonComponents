import React from 'react'
import { Layout } from 'antd'
import './bottom.less'

const { Footer } = Layout

export default class Bottom extends React.Component {
    render() {
        return (
            <Footer className="bottom animated bounceInLeft">
                <div className="text">
                    <div>
                        <span>功能组件by</span>
                        <a href="https://github.com/emmmpro/commonComponents" target="_blank"><span>emmmpro</span></a>
                    </div>
                </div>
            </Footer>
        );
    }
}