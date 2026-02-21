import { createClient } from '@supabase/supabase-js'

export async function getServerSideProps() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )

  const { data: products } = await supabase.from('products').select('*')

  return {
    props: {
      products: products || [],
    },
  }
}

export default function Home({ products }) {
  return (
    <div style={{ padding: '40px', fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '24px' }}>
        👟 Мій Склад Взуття
      </h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
        {products.map((product) => (
          <div key={product.id} style={{ border: '1px solid #ddd', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <h2 style={{ margin: '0 0 10px 0' }}>{product.name}</h2>
            <p style={{ color: '#666', fontSize: '14px' }}>{product.description}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px' }}>
              <span style={{ fontSize: '20px', fontWeight: '900', color: '#10b981' }}>₴{product.price}</span>
              <span style={{ background: '#f3f4f6', padding: '4px 12px', borderRadius: '20px', fontSize: '12px' }}>{product.category}</span>
            </div>
          </div>
        ))}
      </div>

      {products.length === 0 && <p>Товарів не знайдено. Перевір таблицю в Supabase!</p>}
    </div>
  )
}
