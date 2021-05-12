import { Button, Modal, TextField } from '@material-ui/core'
import styled from '@emotion/styled'
import { useEffect, useRef, useState } from 'react'
import { H1 } from 'atoms'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { defineMessage, t } from '@lingui/macro'
import { NavLink } from 'react-router-dom'

export interface IUser {
    id: string
    firstName: string
    lastName: string
    email: string
    phone?: string
    avatar?: string
}

const generateID = () => {
    const randomHex = () => Math
            .floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);

    return `${randomHex()}-${randomHex()}-${randomHex()}-${randomHex()}`
}

export const Users = () => {
    const [usersList, setUsersList] = useState<IUser[]>([])
    const [isUserCreationModalOpen, setIsUserCreationModalOpen] = useState(false)
    const [currentUserData, setCurrentUserData] = useState<IUser | null>(null)

    const form = useForm({ resolver: zodResolver(schema) })
    console.log(generateID())
    const handleModalClose = () => {
        setCurrentUserData(null)
        setIsUserCreationModalOpen(false)
    }
    const handleModalOpen = () => setIsUserCreationModalOpen(true)

    const getUsers = () => {
        const usersFromLS = localStorage.getItem('users')
        if (usersFromLS) setUsersList(JSON.parse(usersFromLS))
    }

    const createUser = form.handleSubmit(async formData => {
        setUsersList([...usersList, { ...formData, id: generateID() }])
        handleModalClose()
    })

    const openModalToEdit = (user: IUser) => {
        setCurrentUserData(user)
        handleModalOpen()
    }

    const editUser = form.handleSubmit(formData => {
        currentUserData && setUsersList(
            usersList.map(user => {
                return (user.id === currentUserData.id) ? { ...formData, id: currentUserData.id } : user
            })
        )
        handleModalClose()
    })

    const removeUser = (id: string) => {
        setUsersList(usersList.filter(user => user.id !== id))
    }

    const onSubmit = currentUserData ? editUser : createUser

    useEffect(() => {
        getUsers()
    }, [])
    useEffect(() => {
        if (usersList) {
            return localStorage.setItem('users', JSON.stringify(usersList))
        }
    }, [usersList])

    return (
        <div>
            <PageHeader>
                {t`users`}({usersList?.length || 0})
                <Button variant='contained' onClick={handleModalOpen}>{t`add user`}</Button>
            </PageHeader>

            <div>
                {usersList?.map((user, index) => (
                    <User key={index}>
                        <img src={user.avatar || 'https://filkiniada-4sc.ucoz.org/80781_3.jpg'} alt="avatar" />
                        <NavLink to={'/user/' + user.id}>
                            <p>{user.firstName} {user.lastName} </p>
                        </NavLink>
                        <Button variant='contained' color='primary' onClick={() => openModalToEdit(user)}>{t`edit user`}</Button>
                        <Button variant='contained' color='secondary' onClick={() => removeUser(user.id)}>{t`remove user`}</Button>
                    </User>
                ))}
            </div>

            <Modal
                open={isUserCreationModalOpen}
                onClose={handleModalClose}
                style={{
                    display: 'grid',
                    placeItems: 'center',
                }}
            >
                <Form onSubmit={onSubmit}>
                    <H1>{t`new user`}</H1>
                    <TextField
                        inputRef={form.register}
                        name="firstName"
                        type="text"
                        error={!!form.errors.firstName}
                        helperText={form.errors.firstName?.message}
                        label={t`firstName`}
                        defaultValue={currentUserData?.firstName}
                    />
                    <TextField
                        inputRef={form.register}
                        name="lastName"
                        type="text"
                        error={!!form.errors.lastName}
                        helperText={form.errors.lastName?.message}
                        label={t`lastName`}
                        defaultValue={currentUserData?.lastName}
                    />
                    <TextField
                        inputRef={form.register}
                        name="email"
                        type="email"
                        error={!!form.errors.email}
                        helperText={form.errors.email?.message}
                        label={t`email`}
                        defaultValue={currentUserData?.email}
                    />
                    <TextField
                        inputRef={form.register}
                        name="phone"
                        type="tel"
                        error={!!form.errors.phone}
                        helperText={form.errors.phone?.message}
                        label={t`phone`}
                        placeholder='0555 555 555'
                        defaultValue={currentUserData?.phone}
                    />
                    <Button type="submit" variant="outlined">{t`submit`}</Button>
                </Form>
            </Modal>
        </div>
    )
}

const schema = z
    .object({
        firstName: z.string().min(3, defineMessage({ id: 'firstName is too short' }).id),
        lastName: z.string().min(3, defineMessage({ id: 'lastName is too short' }).id),
        email: z.string().email('Incorrect email address'),
        phone: z.string().refine((value) => /^0\d{9}$/i.test(value), { message: 'Неправильно введен номер телефона' }),
    })

const User = styled.div`
    display: flex;
    cursor: pointer;
    margin-bottom: 10px;
    & img {
        max-width: 50px;
        width: 100%;
        border-radius: 100%;
        margin-right: 10px;
    }
    & > * {
        margin-right: 10px;
    }
`
const PageHeader = styled.div`
    display: flex;
    align-items: center;
`
const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 500px;
  background: #fff;
  padding: 20px 40px;

  & > *:not(:last-child) {
    margin-bottom: 10px;
  }

  & > button[type='submit'] {
    align-self: flex-end;
  }
`
