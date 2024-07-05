import { StyleSheet } from 'react-native'
import React from 'react'
import { ArrowRightIcon, Text, Card, HStack, Heading, Icon, Image, Link, LinkText } from '@gluestack-ui/themed'

const ArticleCard = ({data}) => {
    const link = `https://insurtechplatform.netlify.app/allarticles`;
  return (
      <Card p="$5" borderRadius="$lg" maxWidth={360} m="$3">
          <Image
              mb="$6"
              h={240}
              width="$full"
              borderRadius="$md"
              source={{
                  uri: data.articleImg,
              }}
          />
          <Heading size="md" fontFamily="$heading" mb="$4">
              {data.title}
          </Heading>
          <Link href={link} isExternal>
              <HStack alignItems="center">
                  <LinkText
                      size="sm"
                      fontFamily="$heading"
                      fontWeight="$semibold"
                      color="$primary600"
                      $dark-color="$primary300"
                      textDecorationLine="none"
                  >
                      Read Article
                  </LinkText>
                  <Icon
                      as={ArrowRightIcon}
                      size="sm"
                      color="$primary600"
                      mt="$0.5"
                      ml="$0.5"
                      $dark-color="$primary300"
                  />
              </HStack>
          </Link>
      </Card>
  )
}

export default ArticleCard

const styles = StyleSheet.create({})