TRUNCATE TABLE
  idempotency_keys,
  stock_moves,
  order_parts,
  order_services,
  orders,
  parts,
  services,
  cars,
  clients
RESTART IDENTITY CASCADE;

INSERT INTO clients (full_name, phone)
SELECT 'Клиент ' || g, '+7900' || lpad(g::text, 7, '0')
FROM generate_series(1, 500) g;

INSERT INTO cars (client_id, brand, model, plate, year, mileage)
SELECT (g % 500) + 1,
      (ARRAY['Lada','Toyota','Kia','Ford','Volkswagen'])[(g % 5) + 1],
      'Model ' || (g % 20),
      'A' || lpad((g % 900)::text, 3, '0') || 'AB' || lpad(((g - 1) / 900)::text, 2, '0'),
      2005 + (g % 20),
       (g * 137) % 300000
FROM generate_series(1, 1200) g;

INSERT INTO services (name, price, duration_min)
VALUES ('Замена масла', 1500, 30),
      ('Замена тормозных колодок', 3000, 60),
      ('Диагностика подвески', 2500, 45),
      ('Замена ремня ГРМ', 8000, 180),
      ('Развал-схождение', 3500, 60);

INSERT INTO parts (sku, name, price, stock_qty)
SELECT 'SKU-' || g, 'Запчасть ' || g, 500 + g * 7, 50
FROM generate_series(1, 300) g;

INSERT INTO orders (car_id, status, scheduled_at, total)
SELECT (g % 1200) + 1,
      (ARRAY['new','in_progress','done','cancelled'])[(g % 4) + 1],
       now() - (g % 200) * interval '1 day',
      0
FROM generate_series(1, 20000) g;
