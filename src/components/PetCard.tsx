import React, { useState } from "react";
import {
    Card,
    CardMedia,
    Typography,
    Button,
    Skeleton,
    Box
} from "@mui/material";

export interface Pet {
    name: string;
    breed: string;
    price: number;
    birthYear: number;
    image: string;
    petType?: string;
}

interface PetCardProps extends Pet {
    onAdopt?: () => void;
}

const PetCard: React.FC<PetCardProps> = ({
                                             name,
                                             breed,
                                             price,
                                             birthYear,
                                             image,
                                             onAdopt
                                         }) => {
    const [imageLoading, setImageLoading] = useState(true);
    const [imageError, setImageError] = useState(false);

    const displayImage = imageError ? "https://via.placeholder.com/280x240" : image;

    const handleAdoptClick = () => {
        if (onAdopt) {
            onAdopt(); //
        }
    };

    return (
        <Box sx={{ width: '100%', mb: 2 }}> {/* Added mb: 4 for gap between rows */}
            {/* Image Card */}
            <Card sx={{
                width: '100%',
                borderRadius: 4,
                backgroundColor: 'white',
                mb: 1,
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                transition: 'box-shadow 0.3s ease-in-out',
                '&:hover': {
                    boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
                },
                '& .MuiCardContent-root:last-child': {
                    pb: 0
                }
            }}>
                {imageLoading && (
                    <Skeleton
                        variant="rectangular"
                        height={240}
                        animation="wave"
                    />
                )}
                <CardMedia
                    component="img"
                    height={240}
                    image={displayImage}
                    alt={`${name} - ${breed}`}
                    sx={{
                        objectFit: "cover",
                        display: imageLoading ? 'none' : 'block'
                    }}
                    onLoad={() => setImageLoading(false)}
                    onError={() => {
                        setImageLoading(false);
                        setImageError(true);
                    }}
                />
            </Card>

            {/* Content Section */}
            <Box sx={{ p: 1.5, bgcolor: '#003366', borderRadius: 4 }}>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 1
                }}>
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 'bold',
                            color: 'white',
                            fontFamily: "'Nunito Sans', sans-serif"
                        }}
                    >
                        {name}
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            fontWeight: 'bold',
                            color: 'white',
                            fontFamily: "'Nunito Sans', sans-serif"
                        }}
                    >
                        LKR {price.toLocaleString()}/=
                    </Typography>
                </Box>

                <Typography
                    variant="body2"
                    sx={{
                        color: 'rgba(255, 255, 255, 0.8)',
                        fontFamily: "'Nunito Sans', sans-serif"
                    }}
                >
                    {breed}
                </Typography>

                <Typography
                    variant="body2"
                    sx={{
                        mt: 1,
                        color: 'rgba(255, 255, 255, 0.8)',
                        fontFamily: "'Nunito Sans', sans-serif"
                    }}
                >
                    Birth {birthYear}
                </Typography>

                <Button
                    variant="contained"
                    fullWidth
                    onClick={handleAdoptClick}
                    sx={{
                        mt: 2,
                        height: '40px',
                        py: 0,
                        textTransform: 'none',
                        backgroundColor: 'white',
                        color: '#003366',
                        fontFamily: "'Nunito Sans', sans-serif",
                        fontWeight: 'bold',
                        borderRadius: '25px',
                        '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        }
                    }}
                >
                    Buy Me
                </Button>
            </Box>
        </Box>
    );
};

export default PetCard;