import { Table, Column, DataType, ForeignKey, Model, BelongsTo } from "sequelize-typescript";
import Budget from "./Budget";
//BelongsTo: Nos permite hacer una relacion entre un modelo y otro
//1 - N: Un presupuento(Budget) puede tener muchos Gastos(expenses)


@Table({
    tableName: 'expenses'
})

class Expense extends Model {
  @Column({
        type: DataType.STRING(100)
     })
     declare name: string

     @Column({
        type: DataType.DECIMAL
     })
     declare amount: number

     @ForeignKey(() => Budget)
     declare budgetId: Budget

//Aqui estamos indicando que este modelo de gastos pertenece a un presupuesto
     @BelongsTo(() => Budget)
     declare budget: Budget
}

export default Expense
