import {Table, Column, Model, DefaultScope, BeforeCreate} from 'sequelize-typescript';
import bcrypt from 'bcrypt';

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

    saltRounds = 10;

    @BeforeCreate
    static hashPassword(instance: UserModel) {
        const salt = bcrypt.genSaltSync(instance.saltRounds);
        instance.password  = bcrypt.hashSync(instance.password, salt);
    }
    
}