import {Table, Column, Model} from 'sequelize-typescript';

@Table({
    tableName: 'users',
    timestamps: true,
    underscored: true
})
export class UserModel extends Model<UserModel> {
    @Column
    email: string

    @Column
    name: string

    @Column
    password: string
}