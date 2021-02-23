import {Table, Column, Model, DefaultScope} from 'sequelize-typescript';

@DefaultScope(() => ({
    attributes: {
        exclude: ['password']
    },
}))
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