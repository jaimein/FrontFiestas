:: añadimos material al proyecto
ng add @angular/material
::creamos el componente nav que tendra tambien el routing
ng g @angular/material:nav shell
::creamos la ventana home, en la cual estara fiestas grupos poblaciones
ng g @angular/material:dashboard home
::añadimos y personalizamos seccion de contacto
ng g @angular/material:address-form contact
::añadimos vista de tabla
ng g @angular/material:table table
::añadimos modelo
ng g class models/fiestaNombres
::creamos servicio fiestas
ng g s services/fiestas
