-- Додаємо кілька кімнат
INSERT INTO rooms (room_number, type, price_per_night)
VALUES
  ('101', 'single', 100.00),
  ('102', 'double', 150.00),
  ('201', 'suite', 250.00);

-- Додаємо гостя
INSERT INTO guests (full_name, email, phone)
VALUES
  ('Ivan Petrenko', 'ivan.petrenko@example.com', '+380991112233');

-- Додаємо бронювання (для гостя з id = 1, кімната з id = 1)
INSERT INTO bookings (guest_id, room_id, check_in, check_out, total_price)
VALUES
  (1, 1, '2025-04-18', '2025-04-21', 300.00);
