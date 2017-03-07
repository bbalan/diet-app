import main from 'router/routes/main'
import food from 'router/routes/food'
import edit from 'router/routes/edit'
import add from 'router/routes/add'
import search from 'router/routes/search'
import etc from 'router/routes/etc'
import dev from 'router/routes/dev'

export default [
  ...main,
  ...food,
  ...edit,
  ...add,
  ...search,
  ...etc,
  ...dev,
]
