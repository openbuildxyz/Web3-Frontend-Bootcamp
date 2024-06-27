import { ReactNode } from 'react'
import { Card, Popover } from 'antd'
import dayjs from 'dayjs'

import { SunOutlined } from '@ant-design/icons'

const WEEK = ['周日', '周一', '周二', '三', '周四', '周五', '周六']

interface IProps {
    children: ReactNode
}



function TodoList ({ children }: IProps) {
    return (
        <Card className="mt-6">
          <div>
            <div className="flex flex-items-center flex-justify-between">
                <span className="flex flex-items-center">
                    <span className="font-size-14 mr-1">{ dayjs().format('DD') }</span>
                    <span className="mr-4">
                        <div className="font-size-4">{ dayjs().format('YY') } 年</div>
                        <div className="font-size-4">{ dayjs().format('MM') } 月</div>
                    </span>
                    <span className="font-size-12">
                        { WEEK[dayjs().day()] }
                    </span>
                </span>
                <span className="font-size-12 cursor-pointer">
                    <Popover placement="top"  content="😢30多度吧，热～～～">
                        <SunOutlined />
                    </Popover>
                </span>
            </div>
            <div className="border border-b-solid border-blue m-b-4"></div>
            { children }
          </div>
        </Card>
    )
}

export default TodoList