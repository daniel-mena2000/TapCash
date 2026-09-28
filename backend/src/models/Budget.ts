import { Table, Column, DataType, HasMany, ForeignKey, Model } from "sequelize-typescript";
import Expense from "./Expense";


@Table({
    tableName: 'budgets'
})

class Budget extends Model{
     @Column({
        type: DataType.STRING(100)
     })
     declare name: string

     @Column({
        type: DataType.DECIMAL
     })
     declare amount: number
//HasMany: Lo ocuparemos ya que en el modelo de Expense estamos indicando que un gasto pertenece a un presupuesto, pero un presupuesto va a tener multiples gastos, para eso de muchos tenemos HasMany, lo hacemos array ya que guardara multiples gastos(expenses)
     @HasMany(() => Expense, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
     })
     declare expenses: Expense[]
}


export default Budget
