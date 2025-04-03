#### Supbase CRUD Operation

**Description:** For multiple rows update use upsert method from supabase taking special care of primary key
**Input JSON**

```json
{
  "listener": "[EVENT_TYPE]",
  "prompt": "a function that update the price property of each row in products table by adding a 40% discount if the price is greater than 30. for the updated row also update the item property which is the name of product by adding an '*' sign before the item (name)",
  "supportingProps": {
    "database": {
      "name": "supabase",
      "envGuide": "use NEXT_PUBLIC before each var"
    }
  }
}
```

**Output JSON:**

```json
{
  "thoughts": "This prompt instructs to update rows in the 'products' table in Supabase, applying a discount and modifying the 'item' property based on the price. Error handling and console logging are included. The Supabase client is initialized using environment variables.",
  "response": {
    "eventListener": "async function main(event, args) {\n  try {\n    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;\n    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;\n    if (!supabaseUrl || !supabaseKey) {\n      throw new Error(\n        'Supabase URL or key not found in environment variables.'\n      );\n    }\n    const supabase = createClient(supabaseUrl, supabaseKey);\n    const { data, error: fetchError } = await supabase\n      .from('products')\n      .select('id, price, item')\n      .gte('price', 30);\n    if (fetchError) throw fetchError;\n    if (!data.length) {\n      console.log('No record to update');\n      return;\n    }\n    const updates = data.map((product) => ({\n      id: product.id,\n      price: Math.floor(product.price * 0.6),\n      item: '*' + product.item,\n    }));\n    const { data: updatedData, error } = await supabase\n      .from('products')\n      .upsert(updates)\n      .select();\n    if (error) throw error;\n    console.log(updatedData);\n  } catch (error) {\n    console.error('An error occurred:', error);\n  }\n}",
    "globals": {},
    "imports": ["import { createClient } from '@supabase/supabase-js'"]
  },
  "expect": "The user must have the Supabase JavaScript client library installed. The environment variables NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY must be set correctly. A table named 'products' with columns 'id', 'price', and 'item' must exist in the Supabase database.  The 'id' column should be the primary key."
}
```
