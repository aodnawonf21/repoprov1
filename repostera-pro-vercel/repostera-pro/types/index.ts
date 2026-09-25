export type ID=string;
export type OrderStatus="Pendiente"|"Confirmado"|"En preparación"|"Listo"|"Entregado"|"Cancelado";
export interface Customer{id:ID;name:string;phone:string;email:string;address:string;notes:string;createdAt:string;updatedAt:string}
export interface Ingredient{id:ID;name:string;category:string;purchaseUnit:string;purchaseQuantity:number;baseUnit:"g"|"kg"|"ml"|"l"|"unidad";purchasePrice:number;stock:number;minimumStock:number;createdAt:string;updatedAt:string}
export interface ProductIngredient{ingredientId:ID;quantity:number}
export interface PackagingItem{name:string;cost:number}
export interface ProductVariant{id:ID;name:string;price:number;margin:number;ingredients:ProductIngredient[];packaging:PackagingItem[];laborHours:number;laborRate:number}
export interface Product{id:ID;name:string;description:string;price:number;margin:number;ingredients:ProductIngredient[];packaging:PackagingItem[];laborHours:number;laborRate:number;variants:ProductVariant[];active:boolean;createdAt:string;updatedAt:string}
export interface OrderItem{productId:ID;productName:string;quantity:number;unitPrice:number;subtotal:number}
export interface Payment{id:ID;date:string;amount:number;note:string}
export interface Order{id:ID;customerId:ID;items:OrderItem[];deliveryDate:string;deliveryTime:string;total:number;payments:Payment[];balance:number;status:OrderStatus;notes:string;createdAt:string;updatedAt:string}
export interface Expense{id:ID;description:string;category:string;amount:number;date:string;note:string}
export interface Notification{id:ID;type:"order"|"delivery"|"stock"|"payment"|"system";title:string;message:string;read:boolean;createdAt:string;relatedEntityId?:ID;relatedEntityType?:string}
export interface UserProfile{id:ID;name:string;email:string;avatar:string;createdAt:string;updatedAt:string}
export interface BusinessProfile{id:ID;businessName:string;logo:string;phone:string;address:string;additionalInfo:string;createdAt:string;updatedAt:string}
export interface ShoppingListItem{id:ID;ingredientId?:ID;name:string;quantity:number;unit:string;checked:boolean;manual?:boolean}
export interface Settings{currency:string;theme:"light"|"dark"|"system";demoData:boolean;defaultMargin:number;rounding:number}
export interface AppData{customers:Customer[];ingredients:Ingredient[];products:Product[];orders:Order[];expenses:Expense[];notifications:Notification[];shoppingList:ShoppingListItem[];userProfile:UserProfile;businessProfile:BusinessProfile;settings:Settings}
