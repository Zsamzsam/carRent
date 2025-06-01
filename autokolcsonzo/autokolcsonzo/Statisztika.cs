using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.ConstrainedExecution;
using System.Text;
using System.Threading.Tasks;

namespace autokolcsonzo
{
    internal class Statisztika
    {
        public List<Car> cars = new List<Car>();

        public Statisztika()
        {
            try
            {
                readDatabase();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }
        }

        public void readDatabase()
        {
            try
            {
                using var connection = new MySql.Data.MySqlClient.MySqlConnection("server=localhost;database=car;uid=root;");
                connection.Open();
                using var command = connection.CreateCommand();
                command.CommandText = "SELECT * FROM cars";
                using var reader = command.ExecuteReader();

                while(reader.Read())
                {
                    var id = reader.GetInt32("id");
                    var license_plate_number = reader.GetString("license_plate_number");
                    var brand = reader.GetString("brand");
                    var model = reader.GetString("model");
                    var daily_cost = reader.GetInt32("daily_cost");
                    Car car = new Car(id, license_plate_number, brand, model, daily_cost);
                    cars.Add(car);
                }
            } catch(Exception e)
            {
                throw new Exception("Adatbazis hiba: " + e.Message, e);
            }
        }

        public void cheapDailyCost()
        {
            int count = 0;
            foreach(var car in cars)
            {
                if(car.Daily_cost < 20000)
                {
                    count++;
                }
            }
            Console.WriteLine($"20.000 Ft-nál olcsóbb napidíjú autók száma: {count}");
        }

        public void expensiveDailyCost()
        {
            bool isThere = false;
            foreach (var car in cars)
            {
                if(car.Daily_cost > 26000)
                {
                    isThere = true;
                    break;
                }
            }

            if (isThere)
            {
                Console.WriteLine("Van az adatok között 26.000 Ft-nál drágább napidíjú autó");
            } else
            {
                Console.WriteLine("Nincs az adatok között 26.000 Ft-nál drágább napidíjú autó");
            }
        }

        public void mostExpensiveDailyCost()
        {
            Car max = cars[0];
            foreach(var car in cars)
            {
                if(car.Daily_cost > max.Daily_cost)
                {
                    max = car;
                }
            }

            Console.WriteLine($"Legdrágább dapidíjú autó: {max.License_plate_number} - {max.Brand} - {max.Model} - {max.Daily_cost} Ft");
        }

        public void groupByBrand()
        {
            Dictionary<string, List<Car>> brands = new Dictionary<string, List<Car>>();

            foreach(Car car in cars)
            {
                if(!brands.ContainsKey(car.Brand))
                {
                    brands.Add(car.Brand, new List<Car>());
                    brands.GetValueOrDefault(car.Brand).Add(car);
                }
                else
                {
                    brands.GetValueOrDefault(car.Brand).Add(car);
                }
            }
            Console.WriteLine("Autók száma: ");
            foreach(string brand in brands.Keys)
            {
                Console.WriteLine($"\t{brand}: {brands.GetValueOrDefault(brand).Count}");
            }
        }

        public void searchCar()
        {
            Console.Write("Adjon meg egy rendszámot: ");
            string lpn = Console.ReadLine();
            Car find = null;
            foreach(var car in cars)
            {
                if(car.License_plate_number == lpn)
                {
                    find = car; 
                    break;
                }
            }

            if(find != null)
            {
                if (find.Daily_cost > 25000)
                {
                    Console.WriteLine("A megadott autó napidíja nagyobb mint 25.000 Ft");
                } else
                {
                    Console.WriteLine("A megadott autó napidíja nem nagyobb mint 25.000 Ft");
                }
            } 
            else
            {
                Console.WriteLine("Nincs ilyen autó");
            }
        }

        public bool delete(Car car)
        {
            using var connection = new MySql.Data.MySqlClient.MySqlConnection("server=localhost;database=car;uid=root;");
            connection.Open();
            using var command = connection.CreateCommand();
            command.CommandText = "DELETE FROM cars WHERE id = @id";
            command.Parameters.AddWithValue("@id", car.Id);
            int lines = command.ExecuteNonQuery();

            return lines > 0;
        }
    }
}
