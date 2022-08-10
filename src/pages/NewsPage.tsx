import { Container, Grid } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { NewsInterface } from '../utils/newsType'

export default function NewsPage() {
    const [news, setNews] = useState<NewsInterface>()

    const fetchNews = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/news`)
            if (response.status === 200) {
                setNews(response.data)
            }
        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        fetchNews()
    }, [])


    return (
        <div>
            <Container sx={{ padding: 2, display: 'flex', mt: '-360px', ml: '350px' }}>
                <Grid>
                    {news && news?.featured_news?.map((item: any) => {
                        return (
                            <div>
                                <h1>{item.title}</h1>
                                <p>{item.description}</p>
                                <p>{item.url}</p>
                                <p>{item.publishedAt}</p>
                            </div>
                        )
                    }
                    )}
                </Grid>


            </Container>
        </div>
    )
}