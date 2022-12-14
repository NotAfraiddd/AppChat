import React from 'react';
import { border, borderInfor, text } from '~/utils/color';
import styled from 'styled-components';
import { Header, Content } from 'antd/lib/layout/layout';
import { EditOutlined, BellOutlined, UsergroupAddOutlined, PushpinOutlined, SettingOutlined, PlusOutlined, CaretRightOutlined } from '@ant-design/icons';
import { useState } from 'react';
import Modal from 'antd/lib/modal/Modal';
import { Button, Collapse, Divider, Form, Menu, Radio, Upload, message, Checkbox } from 'antd';
import Input from 'antd/lib/input/Input';
import MenuItem from 'antd/lib/menu/MenuItem';
import AvatarItemListCheckedUsers from '~/components/menu/content/AvatarItemListCheckedUsers';
import AvatarMember from '~/components/menu/content/AvatarMember';
import { type } from '@testing-library/user-event/dist/type';
import { useSelector } from 'react-redux';
import { AvatarDefault, URL } from '~/utils/constant';
import { getToken } from '~/utils/function';
import axios from 'axios';

const CheckboxGroup = Checkbox.Group;

function AboutChat() {
    const [isOpen1, setIsOpen1] = useState(false);
    const [isOpenInfor, setIsOpenInFor] = useState(false);
    const [isOpenRename, setIsOpenRename] = useState(false);
    const [isOpenMember, setIsOpenMember] = useState(false);
    const [isAddMemberInGroup, setIsAddMemberInGroup] = useState(false);
    const { Panel } = Collapse;
    const { user } = useSelector(state => state.user)
    const { userChat } = useSelector(state => state.userChat)
    const [isLoading, setIsLoading] = useState(false);
    const [findMyFriends, setFindMyFriends] = useState([]);
    const [listChecked, setListChecked] = useState([]);

    const getMyFriends = async () => {
        try {
            setIsLoading(true)
            const { data } = await axios.get(`${URL}/api/user/get-list-friend`, {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                    Accept: 'application/json',
                },
            })

            setFindMyFriends(data?.data)
        } catch (error) {
            setFindMyFriends({
                code: 404,
                message: "Kh??ng c?? b???n b?? n??o"
            })
        }
        setIsLoading(false)
    };


    const handleShowModalTurnOffMess = () => {
        setIsOpen1(true)
    }

    const handleOKModalTurnOffMess = () => {
        setIsOpen1(false)
    }

    const handleCancelModalTurnOffMess = () => {
        setIsOpen1(false)
    }

    const handleShowModalInfor = () => {
        setIsOpenInFor(true)
    }

    const handleOKModalInfor = () => {
        setIsOpenInFor(false)
    }

    const handleCancelModalInfor = () => {
        setIsOpenInFor(false)
    }

    const handleShowModalRename = () => {
        setIsOpenRename(true)
    }

    const handleOKModalRename = () => {
        setIsOpenRename(false)
    }

    const handleCancelModalRename = () => {
        setIsOpenRename(false)
    }

    const handleShowModalMember = () => {
        setIsOpenMember(true)
    }

    const handleOKModalMember = () => {
        setIsOpenMember(false)
    }

    const handleCancelModalMember = () => {
        setIsOpenMember(false)
    }
    // them thanh vien
    const handleShowModalAddMemberInGroup = () => {
        getMyFriends()
        setIsAddMemberInGroup(true)
    }
    const handleCancelModalAddMemberInGroup = () => {
        setIsAddMemberInGroup(false)
    }
    const handleOKModalAddMemberInGroup = async () => {
        const { data } = await axios.post(`${URL}/api/conversation/add-member-conversation-group`, {
            conversationId: userChat.id,
            memberId: listChecked[0]
        }, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
                Accept: 'application/json',
            },
        })

        message.success('Th??m th??nh c??ng')

        setIsAddMemberInGroup(false)
    }

    const onChangeAddToGroup = (list) => {
        setListChecked(list)
    }

    const handleRemoveConversation = async (user_id_remove) => {
        try {
            const { data } = await axios.post(`${URL}/api/conversation/remove-member-conversation-group`, {
                conversationId: userChat.id,
                memberId: user_id_remove,
            }, {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                    Accept: 'application/json',
                },
            })
            message.success('??u???i th??nh c??ng')
        } catch (error) {
            message.error('??u???i th???t b???i')
        }
    }

    const handleUpdateAdminGroup = async (user_id_admin) => {
        try {
            const { data } = await axios.post(`${URL}/api/conversation/change-admin-conversation-group`, {
                conversationId: userChat.id,
                adminId: user_id_admin,
            }, {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                    Accept: 'application/json',
                },
            })
            message.success('C???p nh???t tr?????ng nh??m th??nh c??ng')
        } catch (error) {
            message.error('C???p nh???t tr?????ng nh??m th???t b???i')
        }
    }

    return (<StyledSection>
        <StyledHeader>
            <h3>Th??ng tin h???i tho???i</h3>
        </StyledHeader>
        <StyledContent>
            <StyledAvatar onClick={handleShowModalInfor}
                src={userChat?.avatar || AvatarDefault}

            ></StyledAvatar>
            <StyledNameEdit className='name-user-about-chat'>
                <StyledName>{userChat.name}</StyledName>
                <EditOutlined className='icon-edit' onClick={handleShowModalRename} />
            </StyledNameEdit>
            <StyledFunction>
                <StyledFunctionIcon>
                    <StyledFunctionTurnOff onClick={handleShowModalTurnOffMess}>
                        <BellOutlined />
                        <StyledFunctionName>T???t th??ng b??o</StyledFunctionName>
                    </StyledFunctionTurnOff>
                </StyledFunctionIcon>
                <StyledFunctionIcon>
                    <StyledFunctionTurnOff>
                        <PushpinOutlined />
                        <StyledFunctionName>Ghim h???i tho???i</StyledFunctionName>
                    </StyledFunctionTurnOff>
                </StyledFunctionIcon>
                <StyledFunctionIcon>
                    <StyledFunctionTurnOff onClick={handleShowModalMember}>
                        <SettingOutlined />
                        <StyledFunctionName>Qu???n l?? nh??m</StyledFunctionName>
                    </StyledFunctionTurnOff>

                </StyledFunctionIcon>

            </StyledFunction>
            <StyledCollapse
                bordered={false}
                defaultActiveKey={['0']}
                expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                className="site-collapse-custom-collapse"
            >
                <StyledBorder style={{ width: '100%', position: 'relative', backgroundColor: '#fffcfc00', top: 0 }}></StyledBorder>
                <Panel header="???nh/Video" key="1" className="site-collapse-custom-panel">
                    <StyledButton key="submit" style={{ top: '-10px', left: '38%' }}
                        loading={isLoading} >Xem t???t c???</StyledButton>
                </Panel>

                <StyledBorder style={{ width: '100%', position: 'relative', backgroundColor: '#fffcfc00', top: 0 }}></StyledBorder>
                <Panel header="File" key="2" className="site-collapse-custom-panel">
                    <StyledButton key="submit" style={{ top: '-10px', left: '38%' }}
                        loading={isLoading} >Xem t???t c???</StyledButton>
                </Panel>

                <StyledBorder style={{ width: '100%', position: 'relative', backgroundColor: '#fffcfc00', top: 0 }}></StyledBorder>
                <Panel header="Link" key="3" className="site-collapse-custom-panel">
                    <StyledButton key="submit" style={{ top: '-10px', left: '38%' }}
                        loading={isLoading} >Xem t???t c???</StyledButton>
                </Panel>

                <StyledBorder style={{ width: '100%', position: 'relative', backgroundColor: '#fffcfc00', top: 0 }}></StyledBorder>
                <Panel header="Thi???p l???p b???o m???t" key="4" className="site-collapse-custom-panel" >
                    <StyledButton className='btn-top' key="submit"
                        loading={isLoading}>X??a k???t b???n</StyledButton>
                    <StyledButton className='btn-bottom' loading={isLoading} key="submit" style={{ top: '8px', backgroundColor: 'transparent', color: 'red', width: 'auto' }}>R???i kh???i nh??m tr?? chuy???n</StyledButton>
                </Panel>
            </StyledCollapse>
        </StyledContent>
        <StyledFunction>
        </StyledFunction>
        <StyledModal title="X??c nh???n" open={isOpen1} onCancel={handleCancelModalTurnOffMess} onOk={handleOKModalTurnOffMess}
            footer={[
                <Button loading={isLoading} key="back" style={{ fontWeight: 700 }} onClick={handleCancelModalTurnOffMess}>H???y</Button>,
                <Button loading={isLoading} key="submit" style={{ fontWeight: 700 }} onClick={handleOKModalTurnOffMess} type="primary">?????ng ??</Button>

            ]}>
            <StyledForm name="basic" labelCol={{ span: 8 }} wrapperCol={{ span: 18 }} initialValues={{ remember: false }}
                // onFinish={onFinish} onFinishFailed={onFinishFailed} 
                autoComplete="off">
                <Form.Item>
                    <StyledText>B???n c?? ch???c ch???n mu???n t???t th??ng b??o h???i tho???i n??y:</StyledText>
                    <StyledRadioGroup>
                        <StyledRadio value="option1">Trong 1 gi???</StyledRadio>
                        <StyledRadio value="option2">Trong 4 gi???</StyledRadio>
                        <StyledRadio value="option3">Trong 8 gi???</StyledRadio>
                        <StyledRadio value="option4">?????n khi t??i b???t l???i</StyledRadio>
                    </StyledRadioGroup>
                </Form.Item>
            </StyledForm>
        </StyledModal>
        <StyledModal centered className='infor' title="Th??ng tin t??i kho???n" open={isOpenInfor} onCancel={handleCancelModalInfor} onOk={handleOKModalInfor}
            footer={[
                <Button loading={isLoading} key="back" style={{ fontWeight: 700 }} onClick={handleCancelModalInfor}>H???y</Button>,
                <Button loading={isLoading} key="submit" style={{ fontWeight: 700 }} onClick={handleOKModalInfor} type="primary">?????ng ??</Button>

            ]}>
            <StyledForm name="basic" labelCol={{ span: 8 }} wrapperCol={{ span: 18 }} initialValues={{ remember: false }}
                // onFinish={onFinish} onFinishFailed={onFinishFailed} 
                autoComplete="off">
                <Form.Item>
                    <StyledAvatarNen></StyledAvatarNen>
                </Form.Item>
                <Form.Item>
                    <StyledAvatar style={{ display: 'initial', position: 'absolute', top: '-75px', left: '50%', border: '3px solid white', width: '80px', height: '80px' }}></StyledAvatar>
                </Form.Item>
                <Form.Item wrapperCol={{ span: 24 }}>
                    <StyledNameEdit>
                        <StyledName>Your Name</StyledName>
                        <EditOutlined className='icon-edit' onClick={handleShowModalRename} />
                    </StyledNameEdit>
                </Form.Item>
                <Form.Item style={{ position: 'relative' }}>
                    <StyledButton className='btn-call' loading={isLoading} key="back" style={{ left: '20px' }}>Nh???n tin</StyledButton>,
                    <StyledButton className='btn-mess' loading={isLoading} key="submit" style={{ left: '70px' }} >G???i ??i???n</StyledButton>
                </Form.Item>
                <StyledBorder></StyledBorder>
                <Form.Item>
                    <StyledContainInfor>
                        <StyledText style={{ top: '-30px' }}><h3>Th??ng tin c?? nh??n</h3></StyledText>
                        <StyledDetailInfor>
                            <StyledText>S??? ??i???n tho???i</StyledText>
                            <StyledText>0123456789</StyledText>
                        </StyledDetailInfor>
                        <StyledDetailInfor>
                            <StyledText>Gi???i t??nh</StyledText>
                            <StyledText>N???</StyledText>
                        </StyledDetailInfor>
                        <StyledDetailInfor>
                            <StyledText>Ng??y sinh</StyledText>
                            <StyledText>2001/09/08</StyledText>
                        </StyledDetailInfor>
                    </StyledContainInfor>
                </Form.Item>
            </StyledForm>
        </StyledModal>
        <StyledModal centered title="?????t t??n g???i nh???" open={isOpenRename} onCancel={handleCancelModalRename} onOk={handleOKModalRename}
            footer={[
                <Button loading={isLoading} key="back" style={{ fontWeight: 700 }} onClick={handleCancelModalRename}>H???y</Button>,
                <Button loading={isLoading} key="submit" style={{ fontWeight: 700 }} onClick={handleOKModalRename} type="primary">?????ng ??</Button>

            ]}>
            <StyledForm name="basic" labelCol={{ span: 8 }} wrapperCol={{ span: 24 }} initialValues={{ remember: false }}
                // onFinish={onFinish} onFinishFailed={onFinishFailed} 
                autoComplete="off">
                <Form.Item>
                    <StyledAvatar style={{ position: 'relative', left: '42%' }}></StyledAvatar>
                    <StyledText style={{ display: 'flex', justifyContent: 'center', margin: '6px 0', fontSize: '16px', fontWeight: 500 }}>H??y ?????t m???t c??i t??n d??? nh???</StyledText>
                    <Input />
                </Form.Item>
            </StyledForm>
        </StyledModal>
        <StyledModal centered title="Danh s??ch th??nh vi??n" open={isOpenMember} onCancel={handleCancelModalMember} onOk={handleOKModalMember}
            footer={[
                <Button loading={isLoading} key="back" style={{ fontWeight: 700 }} onClick={handleCancelModalMember}>H???y</Button>,
                <Button loading={isLoading} key="submit" style={{ fontWeight: 700 }} type="primary" onClick={handleOKModalMember}>?????ng ??</Button>
            ]}>
            <Button loading={isLoading} type='primary' style={{ marginRight: '8px' }} onClick={handleShowModalAddMemberInGroup}>Th??m th??nh vi??n m???i</Button>
            <Divider />
            <StyledResultAddFriend>
                {userChat?.listMember?.map((userMember, index) => (
                    <AvatarMember
                        key={index}
                        index={userMember.id}
                        id={userMember.id}
                        userCurrentId={user.id}
                        name={userMember.name}
                        avatar={userMember.avatar}
                        isAdmin={userChat.isAdmin}
                        handleRemoveConversation={handleRemoveConversation}
                        handleUpdateAdminGroup={handleUpdateAdminGroup}
                    ></AvatarMember>
                ))}
            </StyledResultAddFriend>
        </StyledModal>
        <StyledModal centered title="Th??m th??nh vi??n m???i v??o nh??m" open={isAddMemberInGroup} onCancel={handleCancelModalAddMemberInGroup} onOk={handleOKModalAddMemberInGroup}
            footer={[
                <Button loading={isLoading} key="back" style={{ fontWeight: 700 }} onClick={handleCancelModalAddMemberInGroup}>H???y</Button>,
                <Button loading={isLoading} key="submit" style={{ fontWeight: 700 }} onClick={handleOKModalAddMemberInGroup} type="primary">?????ng ??</Button>

            ]}>
            <StyledForm name="basic" labelCol={{ span: 8 }} wrapperCol={{ span: 24 }} initialValues={{ remember: false }}
                autoComplete="off">
                <Form.Item>
                    <StyledText style={{ fontWeight: 600 }}>T??m ki???m b???n b??</StyledText>
                    <Input placeholder='Nh???p t??n, s??? ??i???n tho???i' style={{ borderRadius: '10px' }} />
                </Form.Item>
                <Divider style={{ margin: '16px 0 8px' }}></Divider>
                <StyledText style={{ fontWeight: 600 }}>Tr?? chuy???n g???n ????y</StyledText>
                <StyledListRecentlyChat>
                    <Form.Item>
                        <Menu>
                            <CheckboxGroup onChange={onChangeAddToGroup}>
                                {findMyFriends.filter(u => !userChat?.listMember.find(x => x.id === u.id))?.map((user, index) => (
                                    <Checkbox value={user.id}>
                                        <AvatarItemListCheckedUsers key={index}
                                            index={user.id}
                                            name={user.name}
                                            avatar={user.avatar}
                                        />
                                    </Checkbox>
                                ))}
                            </CheckboxGroup>
                        </Menu>

                    </Form.Item>
                </StyledListRecentlyChat>
            </StyledForm>
        </StyledModal>
    </StyledSection>);
}

export default AboutChat;

const StyledSection = styled.div`
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
    border-left: 1px solid ${border};
    &::-webkit-scrollbar {
        position: relative;
        width: 6px;
        background-color: #ffff;
    }
    &::-webkit-scrollbar-track {
        position: absolute;
    }
    &::-webkit-scrollbar-thumb {
        position: absolute;
        background-color: ${border};
    }
`
const StyledHeader = styled(Header)`
    text-align: center;
    line-height: 64px;
    background-color: transparent;
    border-bottom: 1px solid ${border};
    h3{
        font-weight: 600;
        font-size: 18px;
    }
`

const StyledContent = styled(Content)`
    margin-top: 25px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const StyledAvatar = styled.img`
    background-image: url('https://img4.thuthuatphanmem.vn/uploads/2021/06/04/hinh-nen-chu-cho-cory-chan-ngan-tren-duong-ray_032045111.jpg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    width: 64px;
    height: 64px;
    border-radius: 50%;
    cursor: pointer;
`

const StyledNameEdit = styled.div`
    position: relative;
    top: -40px;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    .icon-edit{
        font-size: 1.2em;
        line-height: 1.4em;
        background-color: ${border};
        border-radius: 50%;
        width: 1.4em;
        height: 1.4em;
        opacity: 0.8;
    }
    &.name-user-about-chat{
        position: relative;
        top: 0px;
    }
`

const StyledName = styled.h2`
    min-width: 50px;
    margin: 0 8px;
`

const StyledFunction = styled.div`
    display: flex;
    justify-content: space-around;
    flex-direction: row;
    width: 100%;
    padding: 0 30px;
    margin-top: 15px;
    margin-bottom: 20px;
`

const StyledFunctionIcon = styled.div`
    width: calc(33.33333% - 30px);
    text-align: center;
    cursor: pointer;
    .anticon{
        font-size: 1.2em;
        line-height: 1.4em;
        background-color: ${border};
        border-radius: 50%;
        width: 1.4em;
        height: 1.4em;
        opacity: 0.8;
    }
`

const StyledFunctionName = styled.div`
    font-size: 12px;
    opacity: 0.8;
    font-weight: 500;
`

const StyledFunctionTurnOff = styled.div`
    cursor: pointer;
`

const StyledFunctionActive = styled.div`
    
`

const StyledModal = styled(Modal)`
    &.infor{
        width: 380px !important;
    }
`

const StyledForm = styled(Form)`
    .ant-form-item{
        margin: 0 0 10px;
    }
    input{
        margin-top: 8px;
    }
`
const StyledText = styled.p`
    font-size: 16px;
    margin: 0;
    display: inline;
    margin: 4px 0;
`

const StyledRadioGroup = styled(Radio.Group)`
    display: flex;
    flex-direction: column;
    
`
const StyledRadio = styled(Radio)`
    margin-top: 4px;
    &.ant-menu-item-selected{
        background-color: transparent;
    }
`
const StyledListRecentlyChat = styled.div`
    max-height: 26vh;
    overflow-y: scroll;
    &::-webkit-scrollbar{
        position: relative;
        width: 6px;
        background-color: #fff;
    }
    &::-webkit-scrollbar-track {
        position: absolute;
    }
    &::-webkit-scrollbar-thumb {
        position: absolute;
        background-color: ${border};
    }
`
const StyledMenuItem = styled(MenuItem)`
    background-color: transparent;
    color: #333;
    font-size: 500;
    min-height: 150px;
    .ant-menu-item-active{
        display: none;
    }
`
const StyledAvatarNen = styled.img`
    background-image: url('https://info-imgs.vgcloud.vn/2022/01/03/13/gap-go-con-meo-hai-mat-ky-la-noi-tieng-khap-mang-xa-hoi.jpg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    width: 380px;
    height: 200px;
    cursor: pointer;
    padding: 0;
    position: relative;
    top: -24px;
    left: -24px;
`
const StyledButton = styled(Button)`
    font-weight: 700;
    width:120px;
    background-color: transparent;
    border-radius: 4px;
    &.btn-call{
        top: -45px;
    }
    &.btn-mess{
        top: -45px;
    }
    &.btn-top{
        margin: 0 120px;
    }
    &.btn-bottom{
        margin: 0 80px;
    }
`
const StyledBorder = styled.div`
    border-bottom: 8px solid ${borderInfor};
    width: 380px;
    position: absolute;
    bottom: 264px;
    left: 0;
`
const StyledDetailInfor = styled.div`
    display: flex;
    justify-content: space-between;
    width: 132%;
`

const StyledContainInfor = styled.div`
    position: relative;
    top: -30px;
`

const StyledCollapse = styled(Collapse)`
    margin-top: 20px;
    width: 100%;
    .ant-collapse-content-box,
    .ant-collapse-header{
        background-color: #fff;
    }

    .ant-collapse-content-box{
        padding: 0;
    }

    [data-theme='compact'] .site-collapse-custom-collapse .site-collapse-custom-panel,
    .site-collapse-custom-collapse .site-collapse-custom-panel {
    margin-bottom: 24px;
    overflow: hidden;
    background: #f7f7f7;
    border: 0px;
    border-radius: 2px;
    }
`

const StyledResultAddFriend = styled.div`
    
`