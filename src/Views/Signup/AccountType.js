import React, { useState } from 'react'
import { Form, Radio, Space } from 'antd'
import { useDispatch, useSelector } from 'react-redux'

//actions
import { setRole } from '../../Store/actions/signupProgress'
import { Button } from 'antd/lib/radio'

const AccountType = () => {
    const progress = useSelector(s => s.signupProgress)
    const dispatch = useDispatch()
    const [value, setValue] = useState(progress.role)

    const onChange = (e) => {
        setValue(e.target.value)
    }

    const next = () => {
        dispatch(setRole({
            role: value,
        }))
    }

    return (
        <>
            <Form>
                <Radio.Group onChange={onChange} value={value}>
                    <Space direction='vertical'>
                        <Radio value='business'>Business</Radio>
                        <Radio value='customer'>Customer</Radio>
                        <Radio value='affiliate'>Affiliate</Radio>
                    </Space>
                </Radio.Group>
                <Form.Item>
                    <Button onClick={next} className='signup-btn'>Next</Button>
                </Form.Item>
            </Form>
        </>
    )
}

export default AccountType
