import Card from '../UI/Card';
import classes from './AvailableMeals.module.css'
import MealItem from "./MealItem/MealItem";
import {useEffect} from 'react'
import { useState } from 'react';


const AvailableMeals = () => {

  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(()=>{
    const fetchMeals = async () => {
      const response = await fetch('https://react-http-33401-default-rtdb.firebaseio.com/meals.json');

      if(!response.ok){
        throw new Error('Something went wrong');
      }

      const data = await response.json();
      console.log(data)

      const loadedMeals = [];
      for(const key in data){
        loadedMeals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        })
      }
      setMeals(loadedMeals);
      setIsLoading(false)
    }


    fetchMeals().catch((error)=>{
      setIsLoading(false);
      setHttpError(error.message)
    });

    
  }, []);

  if(isLoading){
    return <section className={classes.mealIsLoading}>
      <p>Loading...</p>
    </section>
  }

  if(httpError){
    return <section>
      <p className={classes.mealsError}>{httpError}</p>
    </section>
  }


  const mealsList = meals.map((meal) => {
      return(
          <MealItem
            id={meal.id}
            key={meal.id} 
            name={meal.name} 
            description={meal.description} 
            price={meal.price}
            />
      )

  });

  return(
      <section className={classes.meals}>
          <Card>
              <ul>
                  {mealsList}
              </ul>
          </Card>
      </section>
  )
}

export default AvailableMeals;