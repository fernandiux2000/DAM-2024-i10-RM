#!/bin/bash

# Esperar a que MySQL esté disponible
until mysql -h mysql_db -u root -proot -e 'select 1' > /dev/null 2>&1; do
  echo "Esperando a MySQL..."
  sleep 2
done

echo "MySQL está listo. Iniciando el servidor..."
exec "$@"