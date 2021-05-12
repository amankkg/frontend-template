import { useParams } from "react-router-dom"
import type { IUser } from "./Users"
import { t } from '@lingui/macro'

export const UserPage = () => {
    const { id } = useParams()
    const item = localStorage.getItem('users')
    const currentUser: IUser = item && JSON.parse(item).filter((user: IUser) => user.id === id)[0]
    return (
        <div>
            <p>
                <strong>{t`firstName`}:</strong>
                {currentUser.firstName}
            </p>
            <p>
                <strong>{t`lastName`}:</strong>
                {currentUser.lastName}
            </p>
            <p>
                <strong>{t`email`}:</strong>
                {currentUser.email}
            </p>
            <p>
                <strong>{t`phone`}:</strong>
                {currentUser.phone}
            </p>
        </div>
    )
}